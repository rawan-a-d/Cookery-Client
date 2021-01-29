import { transition, trigger, state, style, animate, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation, fadeOutAnimation } from '../animations';

export const fade = trigger('fade', [
    transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '700ms'
          }
        })
    ]),
])