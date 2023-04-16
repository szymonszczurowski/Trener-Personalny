const nav = document.querySelector('.nav')

const navBtn = document.querySelector('.nav__burger')
const navBurger = document.querySelector('.nav__burger-bars')

const navMobileMenu = document.querySelector('.nav__mobile')
const navMobileLink = document.querySelectorAll('.nav__mobile-link')

const navDesktopLink = document.querySelectorAll('.nav__desktop-link')

const handleNav = () => {
	navMobileMenu.classList.toggle('nav__mobile--active')
	navBurger.classList.toggle('nav__burger-bars--dark')
	nav.classList.toggle('nav--white')

	navMobileLink.forEach(item => {
		item.addEventListener('click', () => {
			navMobileMenu.classList.remove('nav__menu--active')
			navBurger.classList.remove('nav__burger-bars--dark')
			nav.classList.remove('nav--white')
		})
	})
}


window.addEventListener('scroll', function () {
	if (window.scrollY >= 100) {
		nav.classList.add('nav-style-scroll')
		navBurger.classList.add('navBurger-style-scroll')
		navBurger.classList.add('nav__burger-bars--dark-scroll')

		for (const item of navDesktopLink) {
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
		navBurger.classList.remove('nav__burger-bars--dark-scroll')

		for (const item of navDesktopLink) {
			item.classList.remove('item-color-one')

			item.addEventListener('mouseout', function () {
				item.classList.remove('item-color-one')
			})
		}
	}
})


navBtn.addEventListener('click', handleNav)
