/*document.addEventListener('DOMContentLoaded', async () => {
    const plansContainer = document.getElementById('plans-container');
  
    // Fetch plans from backend
    try {
      const response = await fetch('/payments/plans');
      const plans = await response.json();
  
      if (response.ok) {
        renderPlans(plans);
      } else {
        console.error('Error al cargar los planes:', plans.error);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  
    // Render plans in the UI
    function renderPlans(plans) {
      plansContainer.innerHTML = '';
  
      plans.forEach(plan => {
        const planCard = document.createElement('div');
        planCard.classList.add('plan-card');
  
        planCard.innerHTML = `
          <h2>${plan.name}</h2>
          <p>Viajes incluidos: ${plan.trips}</p>
          <p>Duración: ${plan.duration}</p>
          <p class="price">$${plan.price}</p>
          <button data-plan-id="${plan._id}">Comprar</button>
        `;
  
        plansContainer.appendChild(planCard);
      });
  
      // Add event listeners to buttons
      const buyButtons = document.querySelectorAll('.plan-card button');
      buyButtons.forEach(button => {
        button.addEventListener('click', handlePayment);
      });
    }
  
    // Handle payment process
    async function handlePayment(event) {
      const planId = event.target.dataset.planId;
  
      try {
        const response = await fetch('/payments/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: 'user123', planId, paymentMethodId: 'pm_12345' }) // Simulated payment
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert('Pago realizado exitosamente');
        } else {
          alert('Error al procesar el pago: ' + result.error);
        }
      } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red al realizar el pago');
      }
    }
  });*/