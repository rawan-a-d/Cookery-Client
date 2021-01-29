import { transition, trigger, state, style, animate, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from '../animations';

export const followsAnimation = trigger('followsAnimation', [
    transition(':enter', [
        group([
            query('@followAnimation', 
            stagger(200, 
              animateChild()
            ),
            { optional: true }
            )
        ])
    ])
])

export const followAnimation = trigger('followAnimation', [
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