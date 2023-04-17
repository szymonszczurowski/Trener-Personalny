const nav = document.querySelector('.nav')
const navBurger = document.querySelector('.nav__burger__bars')
const navItem = document.querySelectorAll('.nav__desktop-item')

const navBtn = document.querySelector('.nav__burger')
const navMenu = document.querySelector('.nav__mobile')
const navMenuItem = document.querySelectorAll('.nav_mobile__box-item')

const footerYear = document.querySelector('.footer__year')

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

const handleNav = () => {
	navMenu.classList.toggle('nav__mobile--active')
	navBurger.classList.toggle('nav__burger__bars--dark')
	nav.classList.toggle('nav--white')

	navMenuItem.forEach(item => {
		item.addEventListener('click', () => {
			navMenu.classList.remove('nav__mobile--active')
			navBurger.classList.remove('nav__burger__bars--dark')
			nav.classList.remove('nav--white')
		})
	})
}

navBtn.addEventListener('click', handleNav)

window.addEventListener('scroll', function () {
	if (window.scrollY >= 100) {
		nav.classList.add('nav-style-scroll')
		navBurger.classList.add('navBurger-style-scroll')
		navBurger.classList.add('nav__burger__bars--dark-scroll')

		for (const item of navItem) {
			item.classList.add('item-color-one')

			item.addEventListener('mouseover', function () {
				item.classList.add('item-color-two')
				item.classList.remove('item-color-one')
			})

			item.addEventListener('mouseout', function () {
				item.classList.add('item-color-one')
			})
		}
	} else {
		nav.classList.remove('nav-style-scroll')
		navBurger.classList.remove('navBurger-style-scroll')
		navBurger.classList.remove('nav__burger__bars--dark-scroll')

		for (const item of navItem) {
			item.classList.remove('item-color-one')

			item.addEventListener('mouseout', function () {
				item.classList.remove('item-color-one')
			})
		}
	}
})

handleCurrentYear()