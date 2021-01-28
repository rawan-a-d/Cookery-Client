import { transition, trigger, state, style, animate, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from '../animations';

export const favouritesAnimation = trigger('favouritesAnimation', [
    transition(':enter', [
        group([
            query('@favouriteAnimation', 
            stagger(200, 
              animateChild()
            ),
            { optional: true }
            )
        ])
    ])
])

export const favouriteAnimation = trigger('favouriteAnimation', [
    transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '500ms'
          }
        })
    ]),
    transition(':leave', [
        style({
          backgroundColor: 'red'
        }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
    ])
])