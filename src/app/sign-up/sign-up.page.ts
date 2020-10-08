import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from '../http.service';
import { UtilityService } from '../utility.service';
import codes from 'country-calling-code';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    public codes: any;
    public dial_code;
    public user_id;
    public mobile_no;
    public name;
    public email_id;
    public password;
    constructor(private statusBar: StatusBar,private location: Location, private router: Router, private route: ActivatedRoute, private http: HttpService, private utility: UtilityService) {
        this.statusBar.backgroundColorByHexString('#ffffff');
        this.codes = codes;
        this.route.queryParams.subscribe((params) => {
            this.user_id = this.router.getCurrentNavigation().extras.state.user_id;
            this.mobile_no = this.router.getCurrentNavigation().extras.state.mobile_no;
        });

    }

    ngOnInit() { }

    onKeyPress(event) {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
            return true
        }
        else {
            return false
        }
    }

    signup() {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.name == undefined) {
            this.utility.showToast("Please enter name")
        } else if (this.email_id == undefined) {
            this.utility.showToast("Please enter email")
        } else if (!this.email_id.match(mailformat)) {
            this.utility.showToast("Please enter valid email address")
        } else if (this.password == undefined) {
            this.utility.showToast("Please enter password")
        } else if (this.password.length < 8) {
            this.utility.showToast("Password should be atlest 8 characters")
        } else {
            this.utility.showLoading();
            let params = {
                user_id: this.user_id,
                name: this.name,
                email: this.email_id,
                password: this.password,
                device_token : this.utility.device_token == undefined ? 'devicetoken' : this.utility.device_token,
                device_type : this.utility.device_type == undefined ? 'devicetype' : this.utility.device_type
            }
            this.http.post("register", params).subscribe(
                (res: any) => {
                    this.utility.hideLoading();
                    if (res.success || res.message == 'Details updated Successfully') {
                        this.utility.showMessageAlert("Welcome " + res.data['user'].user_name + '!',"We are hoping to provide you the best.");
                        this.utility.user = res.data['user'];
                        if(this.utility.user.profile_photo != null){
                            this.utility.image = this.utility.user.profile_photo;
                          }else{
                            this.utility.image = "assets/imgs/no-profile.png";
                          }
                        localStorage.setItem('user_details', JSON.stringify(res.data['user']));
                        localStorage.setItem('token', JSON.stringify(res.data['token']))
                        this.router.navigate(["home"]);

                    } else {
                        this.utility.showMessageAlert("Error ",res.message);
                    }

                }, err => {
                    this.utility.hideLoading();
                    this.utility.showMessageAlert("Network error!", "Please check your network connection.")
                })
        }

    }

    goBack() {
        this.location.back();
    }

}