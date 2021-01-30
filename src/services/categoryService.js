import http from "../services/httpservice";

const endPoint = "/api_category.php";

const getCategories = () => http.get(endPoint);

export default {
    getCategories
}