import {Button, Checkbox, Grid, Icon, Transition} from "semantic-ui-react";
import SDropdown from "../../utilities/customFormControls/SDropdown";
import React, {useEffect, useState} from "react";
import {changeFilteredJobAdverts} from "../../store/actions/listingActions";
import {sort} from "../../utilities/Utils";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";

function JobAdvertSortBar({loading, setLoading}) {

    const dispatch = useDispatch();
    const filteredJobAdverts = useSelector(state => state?.listingReducer.listingProps.jobAdverts.filteredJobAdverts)
    const [open, setOpen] = useState(true);
    const [descVisible, setDescVisible] = useState(false);
    const [ascVisible, setAscVisible] = useState(true);

    useEffect(() => {
        return () => setOpen(undefined)
    }, []);

    const initialValues = {object: "", field: "", direction: 1, date: false, alphabetic: false}
    const formik = useFormik({
        initialValues: initialValues
    });

    const dropdownStyle = {marginTop: 10, marginBottom: 10}
    const checkBoxStyle = {marginBottom: 7, marginTop: 7, marginRight: 7, marginLeft: 7}

    const getSortingOptions = () => {
        if (formik.values.date) return [
            {key: 1, text: "Creation Date", value: "createdAt"},
            {key: 2, text: "Application Deadline", value: "deadline"},
        ];
        if (formik.values.alphabetic) return [
            {key: 1, text: "Position", value: "position.title"},
            {key: 2, text: "Employer", value: "employer.companyName"},
            {key: 3, text: "City", value: "city.name"},
        ]
        return [
            {key: 1, text: "Min Salary", value: "minSalary"},
            {key: 2, text: "Max Salary", value: "maxSalary"},
            {key: 3, text: "Open Positions", value: "openPositions"},
        ]
    }

    const sortingOption = getSortingOptions()

    const toggleSortDirection = () =>
        formik.setFieldValue("direction", formik.values.direction * -1)

    const toggleVisible = () => {
        setDescVisible(formik.values.direction < 0)
        setAscVisible(formik.values.direction >= 0)
    }

    const changeSortType = (fieldName, value) => {
        formik.setValues(initialValues)
        if (fieldName === "date" && value === true) formik.setFieldValue("alphabetic", false);
        else if (fieldName === "alphabetic" && value === true) formik.setFieldValue("date", false);
        formik.setFieldValue(fieldName, value);
    }

    const sortJobAdverts = () => {
        setLoading(true)
        const field = formik.values.field
        const direction = formik.values.direction
        const date = formik.values.date
        const alphabetic = formik.values.alphabetic
        dispatch(changeFilteredJobAdverts(sort(filteredJobAdverts, field, direction, date, alphabetic)))
    }

    const reset = () => formik.setValues(initialValues)

    const getAccordionStatusIcon = (active) =>
        <Icon name={active ? "circle" : "circle outline"} style={{float: "left", marginRight: -20}}/>

    return (
        <div>
            <Button style={{marginTop: 20, marginBottom: 10}} color={"red"} labelPosition={"right"} fluid icon={"sort"}
                    content={<span>{getAccordionStatusIcon(open)}Sort</span>} onClick={() => setOpen(!open)}/>
            <Transition visible={open} duration={150}>
                <div>
                    <Checkbox label='Date' checked={formik.values.date} style={checkBoxStyle}
                              onChange={() => changeSortType("date", !formik.values.date)}/>
                    <Checkbox label='Alphabetic' checked={formik.values.alphabetic} style={checkBoxStyle}
                              onChange={() => changeSortType("alphabetic", !formik.values.alphabetic)}/>
                    <SDropdown options={sortingOption} name="field" placeholder="Field"
                               fluid multiple={false} formik={formik} style={dropdownStyle}/>
                    <Grid>
                        <Grid.Column width={10}>
                            <Button.Group>
                                <Button color={"red"} content={"Apply"} compact labelPosition={"right"} floated={"left"}
                                        loading={loading} disabled={loading} icon={"sort numeric down"} onClick={sortJobAdverts}
                                        style={{borderRadius: 0}} basic/>
                                <Button color={"red"} compact floated={"left"} disabled={loading} icon={"sync"} onClick={reset}
                                        style={{borderRadius: 0}}/>
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <span onClick={toggleSortDirection}>
                                <Transition visible={formik.values.direction < 0 && descVisible} duration={150} onHide={toggleVisible} animation={"drop"}>
                                    <div style={{marginTop: 5, marginLeft: 5}}>
                                        <Icon name={"arrow down"}/>Desc
                                    </div>
                                </Transition>
                                <Transition visible={formik.values.direction >= 0 && ascVisible} duration={150} onComplete={toggleVisible} animation={"drop"}>
                                     <div style={{marginTop: 5, marginLeft: 5}}>
                                         <Icon name={"arrow up"}/>Asc
                                     </div>
                                </Transition>
                            </span>
                        </Grid.Column>
                    </Grid>
                </div>
            </Transition>
        </div>
    )
}

export default JobAdvertSortBar