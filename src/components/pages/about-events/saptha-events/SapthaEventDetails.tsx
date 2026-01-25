import EventDetails from "../components/EventDetails";
import { sapthaGroupEvents, sapthaSoloEvents } from "@/src/data/saptha-events-data";

const SapthaEventDetails = () => {
    return (
        <EventDetails
            groupEvents={sapthaGroupEvents}
            soloEvents={sapthaSoloEvents}
            groupEventsImageFolder="/about-events/saptha/group events"
            soloEventsImageFolder="/about-events/saptha/solo events"
        />
    );
};

export default SapthaEventDetails;
