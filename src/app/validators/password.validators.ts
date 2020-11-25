import { AbstractControl, ValidationErrors } from '@angular/forms'

export class PasswordValidators {


    // static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {

    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (control.value == '1234'){
    //                 // this causes an error because the return is now being done by the callback function
    //                 resolve({
    //                     shouldBeUnique: true
    //                 });
    //             }
    //             else {
    //                 resolve(null);
    //             } 
    //         }, 2000)

    //     });
    // }


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