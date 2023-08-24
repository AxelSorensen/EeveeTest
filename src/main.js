import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowDown, faArrowLeft, faCheck, faChevronLeft, faChevronRight, faClock, faComputerMouse, faDownload, faFile, faFileArrowDown, faFileImport, faGear, faKeyboard, faPencil, faPencilSquare, faPlus, faQuestion, faTrashCan, faTriangleExclamation, faXmark,  } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrashCan, faPlus, faPencil, faXmark, faTriangleExclamation, faChevronLeft, faChevronRight, faPencilSquare, faArrowDown, faArrowLeft, faDownload, faKeyboard, faComputerMouse, faCheck, faQuestion, faClock, faGear, faFile, faFileArrowDown, faFileImport)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')