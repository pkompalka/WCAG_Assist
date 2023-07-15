import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { UserAPIService } from '../../api/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  username: string = "";
  password: string = "";
  passwordRepeat: string = "";
  name: string = "";
  surname: string = "";
  street: string = "";
  postcode: string = "";
  city: string = "";
  isLoading: boolean = false;
  registerError: string = "";
  checkboxState: boolean = false;

  constructor(private localService: LocalService, private userAPIService: UserAPIService) { }

  ngOnInit(): void {
  }

  async onRegisterClicked(): Promise<void> {
    try {
      this.isLoading = true;
      this.registerError = "";
      if (!this.checkboxState) {
        this.registerError = "Agree to Terms & Conditions to register";
        return;
      }
      if (this.password != this.passwordRepeat) {
        this.registerError = "Passwords are different";
        return;
      }
    
      const registerParams = {
        Login: this.username,
        Password: this.password,
        Name: this.name,
        Surname: this.surname,
        Street: this.street,
        Postcode: this.postcode,
        City: this.city,
        Email: this.email
      };
      const userParameters = await this.userAPIService.userRegister(registerParams);
      this.localService.setStorage("user", userParameters);      
      document.location.href = "/";
    } catch {
      this.registerError = "Wrong username or password";
    } finally {
      this.isLoading = false;
    }
  }
}
