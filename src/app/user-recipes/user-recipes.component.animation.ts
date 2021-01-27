import { transition, trigger, state, style, animate, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from '../animations';

// export const fadeIn = trigger('recipesAnimation', [
//     transition(':enter', [
//         query('@recipeAnimation', [
//             stagger(200, animateChild())
//         ])
//     ])
// ])

// export const fadeInOne = trigger('recipeAnimation', [
//     transition(':enter', [
//         useAnimation(fadeInAnimation, {
//             params: {
//                 duration: '1000ms'
//             }
//         })
//     ]),
//     transition(':leave', [
//         style({
//             backgroundColor: 'red'
//         }),
//         animate(1000),
//         useAnimation(bounceOutLeftAnimation)
//     ])
// ])


    // trigger('recipesAnimation', [
    //   transition(':enter', [
    //     group([
    //       query('@recipeAnimation', 
    //       stagger(200, 
    //         animateChild()
    //       ),
    //       { optional: true }
    //       )
    //     ])

    //   ])
    // ]),

    // trigger('recipeAnimation', [
    //   transition(':enter', [
    //     useAnimation(fadeInAnimation, {
    //       params: {
    //         duration: '500ms'
    //       }
    //     })
    //   ]),
    //   transition(':leave', [
    //     style({
    //       backgroundColor: 'red'
    //     }),
    //     animate(1000),
    //     useAnimation(bounceOutLeftAnimation)
    //   ])
    // ])