import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss'],
  imports: [
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class ProfileManagementComponent implements OnInit {
  public updateMyProfileForm!: FormGroup;
  public updatePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.updateMyProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.updatePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  updateProfile(): void {
    if (this.updateMyProfileForm.valid) {
      this.apiService.updateProfile(this.updateMyProfileForm.value).subscribe(
        response => {
          console.log('Profile updated:', response);
          alert('Profile updated successfully!');
        },
        error => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  updatePassword(): void {
    if (this.updatePasswordForm.valid) {
      const passwordData = this.updatePasswordForm.value;
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }

      this.apiService.updatePassword(passwordData).subscribe(
        response => {
          console.log('Password updated:', response);
          alert('Password updated successfully!');
        },
        error => {
          console.error('Error updating password:', error);
          alert('Failed to update password.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
