import { AbstractControl, ValidationErrors } from '@angular/forms'

export class PasswordValidators {
    // Pass entire Form
    static passwordsShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirmPassword = control.get('confirmPassword');

        console.log("Password " + password.value);
        console.log("Confirm Password " + confirmPassword.value);

        if(password.value !== confirmPassword.value) {
            console.log("NO MATCH")
            return {
                passwordsShouldMatch: true
            }
        }
        
        return null;
    }

}