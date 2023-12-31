"use strict";

window.addEventListener('DOMContentLoaded', () => {

	const modalOpenBtns = document.querySelectorAll('[data-modal-open]');
	
	modalOpenBtns.forEach(modalOpenBtn => {

		modalOpenBtn.addEventListener("click", function (e) {
			const modalName = this.dataset.modalOpen;

			if (modalName === null) {
				return;
			}

			const modal = document.querySelector(`[data-modal="${modalName}"]`);
			
			if (modal === null) {
				return;
			}

			openModal(modal, closeModal);

		});

	});

	function openModal(modal, cb) {
		const overlay = modal.closest('.overlay');
		overlay.classList.add('active');
		document.body.style.overflow = 'hidden';
		cb(overlay);
	}

	function closeModal(overlay) {
		overlay.addEventListener("click", function (e) {
			const target = e.target;

			if (target.closest('.modal__close') || target === this) {
				overlay.classList.remove('active');
				document.body.style = '';
			}

		});
	}

});