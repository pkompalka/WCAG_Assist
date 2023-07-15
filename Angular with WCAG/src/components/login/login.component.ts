import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { UserAPIService } from '../../api/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  isLoading: boolean = false;
  registerError: string = "";
  checkboxState: boolean = false;

  constructor(private localService: LocalService, private userAPIService: UserAPIService) { }

  ngOnInit(): void {
  }

  async onLoginClicked(): Promise<void> {
    try {
      this.isLoading = true;
      this.registerError = "";
      if (this.username == "" || this.password == "") {
        this.registerError = "No username or password";
        return;
      }
      
      const loginParams = {
        Login: this.username,
        Password: this.password
      };
      const userParameters = await this.userAPIService.userLogin(loginParams);
      this.localService.setStorage("user", userParameters);      
      document.location.href = "/";
    } catch {
      this.registerError = "Wrong username or password";
    } finally {
      this.isLoading = false;
    }
  }
}
