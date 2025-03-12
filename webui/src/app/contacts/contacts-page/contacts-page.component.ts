import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Contact } from '../../models/contact.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { SendMessageDialogComponent } from '../../messages/send-message-dialog.component';
import { DataGridComponent } from "../../Shared/data-grid/data-grid.component";
import { NgIf } from "@angular/common";
import { TableAction } from "../../models/table-action.model";

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  imports: [
    DataGridComponent,
    NgIf
  ]
})
export class ContactsPageComponent implements OnInit {
  contacts: Contact[] = [];
  loading: boolean = true;

  actions: TableAction[] = [
    { label: 'Edit', action: () => this.editContact(), icon: 'edit' },
    { label: 'Delete', action: () => this.deleteContact(), icon: 'delete' }
  ];

  constructor(private apiService: ApiService, private apollo: Apollo, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.loading = false;
    });
  }

  getHeaders() {
    return ['Name', 'Email', 'Phone'];
  }

  sendMessage(contact: Contact) {
    const dialogRef = this.dialog.open(SendMessageDialogComponent, {
      width: '400px',
      data: { contactId: contact.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apollo.mutate({
          mutation: gql`
            mutation CreateMessage($contact_id: ID!, $type: String!, $body: String!, $user_id: ID!) {
              createMessage(contact_id: $contact_id, type: $type, body: $body, user_id: $user_id) {
                id
                type
                body
                status
              }
            }
          `,
          variables: {
            contact_id: contact.id,
            type: result.type,
            body: result.body,
            user_id: JSON.parse(localStorage.getItem('user') || '{}')?.id || ''
          }
        }).subscribe(response => {
          console.log('Message sent:', response);
        }, error => {
          console.error('Error sending message:', error);
        });
      }
    });
  }

  editContact() {
    console.log('Edit contact');
  }

  deleteContact() {
    console.log('Delete contact');
  }
}
