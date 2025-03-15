document.addEventListener("DOMContentLoaded", function() {
    const plans = [
        { id: 'plan-basico', value: '1.00' },
        { id: 'plan-estandar', value: '5.00' },
        { id: 'plan-premium', value: '10.00' },
        { id: 'plan-avanzado', value: '20.00' },
        { id: 'plan-profesional', value: '50.00' },
        { id: 'plan-empresarial', value: '100.00' }
    ];

    plans.forEach(plan => {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: plan.value
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Transacción completada por ' + details.payer.name.given_name);
                    
                    // Lógica para actualizar la base de datos con el pago realizado
                    axios.post('/api/pagos', {
                        planId: plan.id,
                        payerName: details.payer.name.given_name,
                        payerEmail: details.payer.email_address,
                        amount: plan.value,
                        transactionId: details.id
                    })
                    .then(response => {
                        console.log('Pago registrado en la base de datos:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al registrar el pago en la base de datos:', error);
                    });
                });
            }
        }).render(`#paypal-button-container-${plan.id}`);
    });
});