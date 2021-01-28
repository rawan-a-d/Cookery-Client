import { transition, trigger, state, style, animate, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { flipInX } from 'ng-animate';
import { bounceOutLeftAnimation, fadeInAnimation } from '../../animations';

export const searchByIngredientsAnimation = trigger('searchByIngredientsAnimation', [
    transition(':enter', [
        // style({
        //     opacity: 0
        // }),
        // animate(1000, style({
        //     backgroundColor: 'red'
        // }))
        // style({ 
        //     transform: 'scale3d(.3, .3, .3)',
        //     backgroundColor: 'red'
        // }),
        // animate(1000, style({
        //     backgroundColor: 'blue'
        // }))
        useAnimation(flipInX)
    ]
    ),
    transition(':leave', 
    useAnimation(flipInX)
    //[
        // useAnimation(bounceOutLeftAnimation)
        // group([
        //     query('@favouriteAnimation', 
        //     stagger(200, 
        //       animateChild()
        //     ),
        //     { optional: true }
        //     )
        // ])
    //]
    )
])