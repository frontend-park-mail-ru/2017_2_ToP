export default function multiEventsRegister() {
    EventTarget.prototype.addMultiEvents = function addMultiEvents(events, handler, phase = false) {
        events.split(' ').forEach(event => {
            this.addEventListener(event, handler, phase);
        });
    };
}
