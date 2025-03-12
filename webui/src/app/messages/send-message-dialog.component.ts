import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  standalone: true,
  styleUrls: ['./send-message-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ]
})
export class SendMessageDialogComponent {
  messageForm: FormGroup;

  private createMessageMutation = gql`
    mutation CreateMessage($contactId: ID!, $type: String!, $body: String!, $userId: ID!) {
      createMessage(contact_id: $contactId, type: $type, body: $body, user_id: $userId) {
        id
        type
        body
        status
        user {
          id
          name
        }
      }
    }
  `;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    public dialogRef: MatDialogRef<SendMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contactId: string, userId: string }
  ) {
    this.messageForm = this.fb.group({
      type: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const { type, body } = this.messageForm.value;
      const { contactId, userId } = this.data;

      this.apollo.mutate({
        mutation: this.createMessageMutation,
        variables: {
          contactId,
          type,
          body,
          userId
        }
      }).subscribe({
        next: (result: any) => {
          console.log('Message sent successfully:', result.data.createMessage);
          this.dialogRef.close(result.data.createMessage);
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.dialogRef.close(null);
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
