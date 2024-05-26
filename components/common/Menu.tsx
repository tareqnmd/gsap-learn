'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './menu.css';
const menuLinks = [
	{
		path: '/',
		label: 'Home',
	},
	{
		path: '/about',
		label: 'About',
	},
	{
		path: '/blog',
		label: 'Blog',
	},
	{
		path: '/contact',
		label: 'Contact',
	},
];
const Menu = () => {
	const container = useRef(null);
	const tl: any = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	useGSAP(
		() => {
			gsap.set('.menu-link-item-holder', { y: 50 });
			gsap.set('.menu-overlay', { display: 'none' });
			tl.current = gsap
				.timeline({ paused: true })
				.to('.menu-overlay', {
					duration: 0.5,
					display: 'flex',
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					ease: 'power4.inOut',
				})
				.to('.menu-link-item-holder', {
					y: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power4.inOut',
					delay: -0.5,
				});
		},
		{ scope: container }
	);

	useEffect(() => {
		if (isMenuOpen) {
			tl.current.play();
		} else {
			tl.current.reverse();
		}
	}, [isMenuOpen]);
	return (
		<nav
			ref={container}
			className="relative"
		>
			<div className="flex items-center justify-between">
				<Link href="/">Tareq</Link>
				<button onClick={toggleMenu}>Menu</button>
			</div>
			<div className="menu-overlay flex-col gap-4 hidden">
				<div className="absolute right-4 top-2 z-10">
					<div
						className="menu-close cursor-pointer text-4xl"
						onClick={toggleMenu}
					>
						<p>&#x2715;</p>
					</div>
				</div>
				<ul className="menu-links grid gap-4">
					{menuLinks.map((link, index) => (
						<li
							className="menu-link-item-holder text-6xl"
							onClick={toggleMenu}
							key={index}
						>
							<Link
								className="menu-link"
								href={link.path}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
