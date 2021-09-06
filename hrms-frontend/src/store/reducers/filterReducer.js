import {filter} from "../initialStates/filterInitial";
import {
    CHANGE_EMPLOYER,
    CHANGE_EMPLOYERS_FILTERS, CHANGE_FILTERED_EMPLOYERS,
    CHANGE_FILTERED_JOB_ADVS, CHANGE_JOB_ADV_VERIFICATION, CHANGE_JOB_ADVERT,
    CHANGE_JOB_ADVERTS_FILTERS
} from "../actions/filterActions";
import {changePropInList} from "../../utilities/Utils";

const initialState = {
    filter: filter,
}

export default function filterReducer(state = initialState, {type, payload}) {

    switch (type) {
        case CHANGE_JOB_ADVERTS_FILTERS:
            state.filter.jobAdvertsFilters = payload.jobAdvertsFilters
            return {...state}
        case CHANGE_FILTERED_JOB_ADVS:
            state.filter.filteredJobAdverts = payload.filteredJobAdverts
            return {...state}
        case CHANGE_JOB_ADVERT:
            state.filter.filteredJobAdverts = changePropInList(payload.jobAdvId, payload.jobAdvert, state.filter.filteredJobAdverts)
            return {...state}
        case CHANGE_JOB_ADV_VERIFICATION:
            const index = state.filter.filteredJobAdverts.findIndex((jobAdv) => jobAdv.id === payload.jobAdvId)
            state.filter.filteredJobAdverts[index].verified = payload.status
            state.filter.filteredJobAdverts[index].rejected = !payload.status
            return {...state}
        case CHANGE_EMPLOYERS_FILTERS:
            state.filter.employersFilters = payload.employersFilters
            return {...state}
        case CHANGE_FILTERED_EMPLOYERS:
            state.filter.filteredEmployers = payload.filteredEmployers
            return {...state}
        case CHANGE_EMPLOYER: {
            const index = state.filter.filteredEmployers.findIndex((employer) => employer.id === payload.emplId)
            state.filter.filteredEmployers[index] = payload.employer
            return {...state}
        }
        default:
            return state
    }
}
