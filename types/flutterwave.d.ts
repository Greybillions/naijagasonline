declare module 'flutterwave-node-v3' {
  export default class Flutterwave {
    constructor(publicKey: string, secretKey: string);

    Payment: {
      initialize(payload: Record<string, unknown>): Promise<{
        status: string;
        message: string;
        data: {
          link: string;
          [key: string]: unknown;
        };
      }>;
      verify(transactionId: string): Promise<{
        status: string;
        message: string;
        data: Record<string, unknown>;
      }>;
    };

    // Extend with other service categories if needed (e.g., Transfers, Refunds, etc.)
  }
}
