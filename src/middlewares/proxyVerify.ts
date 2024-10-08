import { ApiError } from "../libs/apiError";

export default function VerifyHeaderProxy(req: any, res: any, next: any) {
    const header = req.headers["x-proxy-header"];

    if (header === "secret-value") {
        next();
    } else {
        res.status(403).send(new ApiError(404, "Acesso externo negado", "acesso negado", {}));
    }
}
