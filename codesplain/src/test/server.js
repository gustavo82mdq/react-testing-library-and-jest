import { setupServer } from 'msw/node';
import { rest } from 'msw';

export function createServer(handlersConfig) {
    const handlers = handlersConfig.map(handlerConfig => {
        return rest[handlerConfig.method || 'get'](handlerConfig.path, (req, res, ctx) => {
            return res(
                ctx.json(
                    handlerConfig.res(req, res, ctx)
                )
            );
        });
    });

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.restoreHandlers();
    });

    afterAll(() => {
        server.close();
    });
}