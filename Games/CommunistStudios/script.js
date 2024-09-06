const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const lessonLinks = document.getElementsByClassName('lesson-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})
toggleButton.addEventListener('click', () => {
    lessonLinks.classList.toggle('active')
})
