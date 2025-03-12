import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Contact, ContactsResponse } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private gqlUrl = environment.gqlUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userId', response.user.id); // Store user ID
        }
      }),
      map(response => !!response.token)
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<ContactsResponse>(`${this.apiUrl}/contacts`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data)
    );
  }

  updateProfile(profileData: { name: string; email: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/update`, profileData, { headers: this.getAuthHeaders() }).pipe(
      tap(response => console.log('Profile updated successfully:', response))
    );
  }

  updatePassword(passwordData: { currentPassword: string; newPassword: string; confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/me/update-password`, passwordData, { headers: this.getAuthHeaders() }).pipe(
      tap(response => console.log('Password updated successfully:', response))
    );
  }

  getUserHistory(): Observable<any[]> {
    const query = `
      query GetUserMessages($userId: ID!) {
        userMessages(userId: $userId) {
          id
          body
          type
          status
          created_at
        }
      }
    `;

    const variables = {
      userId: localStorage.getItem('userId')
    };

    return this.http.post<any>(`${this.gqlUrl}`, {
      query,
      variables
    }, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data.userMessages),
      tap(messages => console.log('User message history:', messages))
    );
  }
}
