import { formatRelative } from "date-fns";

export const filterMarkers = (filters, markers) => {
    if (filters.length > 0) {
        const dateFilter = filters.filter(filter => filter.filter === 'date'); 
        const trainingFilter = filters.filter(filter => filter.filter === 'training'); 
        const participantsFilter = filters.filter(filter => filter.filter === 'participants');
        const ratingFilter = filters.filter(filter => filter.filter === 'rating'); 

        return markers.filter(marker => {
            const datePass = dateFilter.length === 0 || dateFilter.some(filter => {
                return checkDate(filter, marker.trainingTime); 
            });

            const trainingPass = trainingFilter.length === 0 || trainingFilter.some(filter => {
                return marker.activityType === filter.value; 
            });

            const participantsPass = participantsFilter.length === 0 || participantsFilter.some(filter => {
                return marker.maxPeople >= filter.from && marker.maxPeople <= filter.to;
            });

            const ratingPass = ratingFilter.length === 0 || ratingFilter.some(filter => {
                return marker.owner.rating == filter.value;
            });

            return datePass && trainingPass && participantsPass && ratingPass;
        });
    }
    return markers; 
}

const checkDate = (filter, trainingTime) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "today", "tomorrow"];
    const markerTrainingTime = formatRelative(new Date(trainingTime.seconds * 1000), new Date()); 

    if (filter.value === "Today") {
        return markerTrainingTime.includes('today');
    } 
    
    if (filter.value === "Tomorrow") {
        return markerTrainingTime.includes('tomorrow');
    } 

    if (filter.value === "Within 7 days") {
        return daysOfWeek.some(day => markerTrainingTime.includes(day));
    }
}
