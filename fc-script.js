let calendar;
let botaoAgendar = document.getElementById('botaoAgendar');
let binId = '638419677966e84526cd957f'

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        weekends: false,
        themeSystem: 'bootstrap5',
        initialView: 'timeGridWeek',
        slotMinTime: '09:00:00',
        slotMaxTime: '18:00:00',
        slotDuration: '01:00:00',
        height: 'auto',
        locale: 'pt-BR',
        allDaySlot: false,
        businessHours: [
            {
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '09:00',
                endTime: '12:00',
            }, {
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '13:00',
                endTime: '18:00',
            },
        ],
        dateClick: function (info) {
            if (info.date.getHours() == 12) return;
            let conta = pegaContaStorage();
            let title = conta.nome + ' - ' + conta.telefone;
            let events = calendar.getEvents();
            events.forEach((e) => {
                if (e.title == title) {
                    e.remove()
                }
            });
            calendar.addEvent({
                title: title,
                start: info.dateStr,
                extendedProps: { ...conta }
            });
        },
        eventClick: function (eventClickInfo) {
            eventClickInfo.event.remove();
        },
    });
    calendar.render();
});


if (botaoAgendar) {
    botaoAgendar.addEventListener('click', () => {
        let listaEventos = calendar.getEvents().map(e => {
            let novoEvent = {
                title: e.title,
                extendedProps: e.extendedProps,
                start: e.startStr
            }
            return novoEvent;
        })
        let listaEventosJson = JSON.stringify(listaEventos);
        salvaNaNuvem(listaEventosJson)
    });
}

function pegaEventos() {
    let options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2b$10$VNaqofJPWCywDfQSBA7KwOvAYFkf./LUEqui.cR7pYBcnQmExT/Yi",
            "X-Bin-Meta": "false"
        }
    }
    return fetch('https://api.jsonbin.io/v3/b/' + binId, options)
        .then(response => response.json())
        .then(body => {
            body.forEach(e => calendar.addEvent(e))
        });
}

function salvaNaNuvem(eventos) {
    let options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2b$10$VNaqofJPWCywDfQSBA7KwOvAYFkf./LUEqui.cR7pYBcnQmExT/Yi",
        },
        body: eventos,
    }
    fetch('https://api.jsonbin.io/v3/b/' + binId, options)
        .then(response => response.json())
        .then(body => {
            alert('Agendado')
        });
}