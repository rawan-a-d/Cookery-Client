import { animate, animation, keyframes, style } from "@angular/animations";

export let bounceOutLeftAnimation = animation(
    // animate is used to apply styles over a perios of time
    animate('0.5s ease-out', 
        keyframes([
            // each keyframe is a style
            style({
                // 20%
                offset: .2,
                opacity: 1,
                transform: 'translateX(20px)'
            }),
            style({
                // at the end
                offset: 1,
                opacity: 0,
                transform: 'translateX(-100%)'
            })
        ])
    )
)


export let fadeInAnimation = animation(
    [  
        style({
                opacity: 0
            }
        ),
        // use different duration??
        // animate(2000)
        // animate('2s ease-out')
        animate('{{ duration }} {{ easing }}')
    ], { params: // default values if they were'nt provided
        {
            duration: '2s', 
            easing: 'ease-out'
        }
    }
)