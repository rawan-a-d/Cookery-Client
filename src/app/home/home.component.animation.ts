import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeInAnimation } from "../animations";

export const homeAnimation = trigger('homeAnimation', [
    transition(':enter', [
        useAnimation(fadeInAnimation, {
            params: {
              duration: '200ms'
            }
        })
    ])
])