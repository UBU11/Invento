import EventDetails from "../components/EventDetails";
import { generalGroupEvents, generalSoloEvents } from "@/src/data/general-events-data";

const GeneralEventDetails = () => {
    return (
        <EventDetails
            groupEvents={generalGroupEvents}
            soloEvents={generalSoloEvents}
            groupEventsImageFolder="/about-events/general/group events"
            soloEventsImageFolder="/about-events/general/solo events"
        />
    );
};

export default GeneralEventDetails;

