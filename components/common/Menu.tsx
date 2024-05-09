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
	const tl = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	useGSAP(
		() => {
			gsap.set('.menu-link-item-holder', { y: 75 });
			tl.current = gsap
				.timeline({ paused: true })
				.to('.menu-overlay', {
					duration: 1.25,
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					ease: 'power4.inOut',
				})
				.to('.menu-link-item-holder', {
					y: 0,
					duration: 1,
					stagger: 0.1,
					ease: 'power4.inOut',
					delay: -0.75,
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
		<div
			className="menu-container"
			ref={container}
		>
			<div className="menu-bar">
				<div className="menu-logo">
					<Link href="/">Tareq</Link>
				</div>
				<div
					className="menu-open"
					onClick={toggleMenu}
				>
					<p>Menu</p>
				</div>
				<div className="menu-overlay">
					<div className="menu-overlay-bar">
						<div className="menu-logo">
							<Link href="/">Tareq</Link>
						</div>
						<div
							className="menu-close"
							onClick={toggleMenu}
						>
							<p>Close</p>
						</div>
					</div>
					<div className="menu-close-icon">
						<p>&#x2715;</p>
					</div>
					<div className="menu-copy">
						<div className="menu-links">
							{menuLinks.map((link, index) => (
								<div
									key={index}
									className="menu-link-item"
								>
									<div
										className="menu-link-item-holder"
										onClick={toggleMenu}
									>
										<Link
											className="menu-link"
											href={link.path}
										>
											{link.label}
										</Link>
									</div>
								</div>
							))}
						</div>
						<div className="menu-info">
							<div className="menu-info-col">
								<a href="#">X &#8599;</a>
								<a href="#">Instagram &#8599;</a>
								<a href="#">Linkedin &#8599;</a>
								<a href="#">Behance &#8599;</a>
								<a href="#">Dribble &#8599;</a>
							</div>
							<div className="menu-info-col">
								<p>info@tareq.com</p>
								<p>123 1234 1234</p>
							</div>
						</div>
					</div>
					<div className="menu-preview">
						<p>View Showreel</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
