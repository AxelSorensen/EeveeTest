import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowDown, faArrowLeft, faChevronLeft, faChevronRight, faComputerMouse, faDownload, faKeyboard, faPencil, faPencilSquare, faPlus, faTrashCan, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrashCan, faPlus, faPencil, faXmark, faTriangleExclamation, faChevronLeft, faChevronRight, faPencilSquare, faArrowDown, faArrowLeft, faDownload, faKeyboard, faComputerMouse)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')