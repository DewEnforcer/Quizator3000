import http from "./httpservice";

const endPoint = "/api.php?";

const getQuestions = query => http.get(endPoint + query);

export default {
    getQuestions
}