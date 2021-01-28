import { transition, trigger, state, style, animate, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from '../animations';

export const recipesAnimation = trigger('recipesAnimation', [
    transition(':enter', [
        // query('@recipeAnimation', [
        //     stagger(200, animateChild())
        // ])

        group([
            query('@recipeAnimation', 
            stagger(200, 
              animateChild()
            ),
            { optional: true }
            )
        ])
    ])
])

export const recipeAnimation = trigger('recipeAnimation', [
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