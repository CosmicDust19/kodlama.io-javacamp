package com.finalproject.hrmsbackend.core.utilities;

import lombok.experimental.UtilityClass;

public enum Msg {

    //simple
    SUCCESS("Successful"),
    SUCCESS_UPDATE_REQUEST("Update request received, updateId:"),
    FAILED("Failed"),
    SAVED("Saved"),
    UPDATED("Updated"),
    DELETED("Deleted"),
    DELETE_ERROR("An error has occurred during deletion"),
    UPLOADED("Uploaded"),
    UPLOAD_ERROR("An error has occurred during upload"),
    RESULT_SUM("Result summary"),
    LOGGED_IN("Logged in"),

    //customizable
    INVALID("invalid"),
    INVALID_DATE("invalid date format (should be yyyy-mm-dd)"),
    USED("used before"),
    IS_IN_USE("is in use"),
    NOT_HAVE("does not have this"),
    NOT_EXIST("does not exist"),
    NOT_FOUND("not found"),
    IS_THE_SAME("is the same as before"),
    THE_SAME("the same as before"),
    ALREADY_CONTAINS("already contains this"),
    DIFF_DOMAIN("have different domain"),
    EXTERNAL_INTERVENTION("can have been intervened externally"),

    //explanation
    WRONG("Wrong"),
    EMPTY("Empty"),
    NO_ID_FOUND("No ids were found, nothing executed"),
    NO_UPDATE("There are no updates available"),
    UK_JOB_ADV_ADD("You already have an advert in this city, position and description"),
    UK_JOB_ADV_UPD("You already have an advert or update request in this city, position and description"),
    START_END_YEAR_CONFLICT("The end year cannot be a date before the start year"),
    MIN_MAX_CONFLICT("Min value cannot be greater than max value"),
    INVALID_LANG_LVL("Not a language level according to the common european framework (A1, A2 etc.)"),
    MERNIS_FAIL("Mernis verification failed"),
    SORT_DIRECTION("Negative & Null -> Desc, Positive & Zero -> Asc"),
    NOT_AN_IMAGE("Not an image"),
    IMG_VALIDATION_ERR("An error has occurred while validating image"),
    MALFORMED_JSON_REQUEST("Malformed JSON request"),
    LOGIN_FAIL("Please check your email and password");

    private final String MSG;

    Msg(String msg) {
        MSG = msg;
    }

    public String get() {
        return MSG;
    }

    public String get(String firstExp) {
        return String.format("%s %s", firstExp, MSG);
    }

    public String getCustom(String format) {
        return String.format(format, MSG);
    }

    //messages for annotations
    @UtilityClass
    public class Annotation {

        public static final String REQUIRED = "required";
        public static final String SIZE = "size must be between {min} and {max}";
        public static final String MIN = "must be greater than {value}";
        public static final String MAX = "must be less than {value}";
        public static final String POSITIVE = "should be positive";
        public static final String FUTURE = "should be in the future";
        public static final String PATTERN = "is not in correct format";

    }

}
