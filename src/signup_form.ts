interface ISignupFormParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  [key: string]: string[];
}

export class SignupForm {
  errors: FormErrors = {};
  AUTH_CONFIG = {
    MIN_PASSWORD_LENGTH: 8
  };

  constructor(private params: ISignupFormParams = {}) {}

  isValid(): boolean {

    if (!this.params.first_name.length) {
      this.errors.first_name = [ "can't be blank" ];
    }

    if (!this.params.last_name.length) {
      this.errors.last_name = [ "can't be blank" ];
    }

    if (!this.params.email.length) {
      this.errors.email = [ "can't be blank" ];
    }
    else{
      if(!this.isValidEmailAddress(this.params.email)){
        this.errors.email = [ "not a valid email address"];
      }
    }


    if(this.params.password !== this.params.password_confirmation){
      this.pushPasswordError("does not match")
    }
    else{
      if(this.params.password.length < this.AUTH_CONFIG.MIN_PASSWORD_LENGTH){
        this.pushPasswordError("too short" );
      }

      if(!this.doesPasswordContainUppercase(this.params.password)){
        this.pushPasswordError("doesn't contain an uppercase letter");
      }
      
      if(!this.doesPasswordContainLowercase(this.params.password)){
        this.pushPasswordError("doesn't contain a lowercase letter");
      }
      

    }
    

    return Object.keys(this.errors).length === 0;
  }

  private pushPasswordError(errorMessage:string){
    if(!this.errors.password) this.errors.password = [];

    this.errors.password.push(errorMessage);
  }

  private isValidEmailAddress(email:string):boolean{
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  // password format logic

  private doesPasswordContainUppercase(password:string):boolean{
    const uppercaseRegex = /[A-Z]+/;

    return uppercaseRegex.test(password);
  }
  private doesPasswordContainLowercase(password:string):boolean{
    const uppercaseRegex = /[a-z]+/;

    return uppercaseRegex.test(password);
  }

  // end password format logic

}
