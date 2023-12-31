'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const ordersList = document.querySelector('.orders-list');

  if (ordersList == null) {
    return;
  }

  ordersList.addEventListener('click', function (e) {

	const target = e.target;
	const menuStatusBtn = target.closest('.item-orders__status-btn');

    if (menuStatusBtn === null) {
		return;
    }

    const orderItem = menuStatusBtn.closest('.item-orders');
	 const modal = orderItem.querySelector('.modal-status');
    openModal(modal, closeModal);
	 changeOrderStatus(orderItem);
  });

  function openModal(modal, cb) {
    const overlay = modal.closest('.overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    cb(overlay);
  }

  function closeModal(overlay) {
    overlay.addEventListener('click', function (e) {
      const target = e.target;

      if (target.closest('.modal-status__close') || target === this) {
        overlay.classList.remove('active');
        document.body.style = '';
      }
    });
  }

  function changeOrderStatus(order) {
	const statusBtns = order.querySelectorAll('.modal-status__btn');
	
	if (statusBtns.length === 0) {
		return;
	}

	statusBtns.forEach(statusBtn => {
		statusBtn.addEventListener("click", async function (e) {

			const getStatusText = (status) => {
				const statusText = {
					'in-proccess': 'В обробці',
					'done': 'Виконано',
					'rejected': 'Відхилено',
				 };
			
				 return statusText[status];
			};

			const status = statusBtn.dataset.status;
			const orderId = parseInt(order.id.split('-')[1]);

			await fetch('/order', {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({orderId, statusText: getStatusText(status)})
			}).then(_ => location.href = '/orders');
			
		}, {once: true});
	});

  }
  
});
