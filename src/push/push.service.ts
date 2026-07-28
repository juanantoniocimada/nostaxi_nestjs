import { Injectable, Logger } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class PushService {
    private readonly logger = new Logger(PushService.name);

    constructor() {
        // Inicializar Firebase
        try {
            initializeApp({
                credential: cert({
                    projectId: 'nostaxi-dede1',
                    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1jTvV/XYkICJw\n8wow5ppsqOIY98Yhq/OWgW31SJaajk9zDPM01SkFgejOLSr9yx6KwF9IRqEuRC02\nKjRCPE84SC9o6BVM3CqvKjvLOGscjfIwcM2JqFCF5n0Fn6zwHm1yV0zZPUAVC2fe\n2PdZCMIXkh6i2pcVp9COsR4W3l6tecfmyQc0LiyUEqLJEnV2PrCr67r0WZ012lSD\nj2ev0hp2ZShb/iAJgXUkdamYEzy1G2TuoRHMZMNdjhYGX5Kyz1V0qEIJMNCLOgGx\nOPR0Y3RfifJ5hgoaK0g2HGs7bLdNKRngyAYbouvzsAGBplbrB/zGMVS7PEa4plra\nYAg3dnslAgMBAAECggEAHRgdkyzzrlVh/5TLOMvzyl8EILkwTLwYJLHoM6smy2zr\n6YWVQg247bOEYeoWHibbZaPvgQ8kjFwLnMcFqemtTlkvE9JBe5g61OhhPa90ZtaO\njdm97oYFJXgq5+hPWAmgQ3cfDx9EMjsqMam2ddOz+wAFHdcG6EcE4qEar9KB/K2m\nxJBT3fr6yJUdRWpHA/1spAynZ11e8b5kAQHRerh2QqAuJLdoic/9JRbzt/iZLldR\nVxERElSyfhnjJhNupGNLTELgcN6/UnTtdiGA9wOHbr8WBEf6LYekhmQA0NwMHCse\nn/mEnsUZeS9y/YEFPjwrgOnya63fFxgASMQl20hcIQKBgQDhDaQTN+PpxSwUaWr/\nMrECY+GKnI/eu6r4uHh08HzfHYATCoVGcWPL739HJMpQG4agIU1ZA5vBbbSIcRlw\nnnWWln+NWu/Pmp6T02rJkU4IPuptH8NodtMtbrDq97WDFeqqZv2v+n2mtWoOSe97\n+lO3dvK7TfA4EqYTMbczGgJbEQKBgQDOhD5ODm3OQcVfeaMKIROFg71SrMPsTL3W\nY//RCR4xdgMuFf7VfmlfCAljwZtO+sCwOFYSFc3Zr69m/4X0QjOnpi1eYvqXY/f4\nrnUcT25t9gbwMK0Vsz26tzjR79HYxGUQGw2JUox07SFYtGez/qYden/bCrFH2He1\nfJpjIFlW1QKBgQC5F4r182WTAgL61qiVMo+6M4NviMwal6ZJ4Q3Qv2kz5wNKpcBu\n6xr0wwie7ncl4z2ZvUnsB7e2Ig/0l3Ag23JCY4yMKVpKGBSL57lQBh1zUqtjDFie\nNfwAxaTj2s6B/Sh+9S136kAlN9b94XkBMiRgI4gG3FbRByVna+AMOzvswQKBgQCO\ndpfsjPOe56xasrSQVkT7Q+gk0l3N8xq6fP2KnHmhsUF8V1wWtz/FeOvRT0vubfjj\nF9n4W+ZHl3Su3vLvj4PG0VJW3Hz2VtZHTUIop3sMjD45D7s3TxD0b1TZLlFa8hCt\nzZvG8ZVHTBZG9RzdBHxftZPh7Txizae3IR/35eb7iQKBgQC+AS441yejxAsepMUo\nPTC4XOjPG3opWY7tr9C1rA5TzmC/W0Iapto85+gFu8fN2uVZqKT29riSDDXKyIYo\nUavx7VjrTLdbM+zbfwz2ZF6X6sqCciuEE4qYxtNfqkm0to+MyfCR1CpaaH6iGI4H\nLTbb4hRkz+s9m/yzHJ8rLxBtkA==\n-----END PRIVATE KEY-----\n',
                    clientEmail: 'firebase-adminsdk-fbsvc@nostaxi-dede1.iam.gserviceaccount.com',
                })
            });
            this.logger.log('✅ Firebase inicializado correctamente');
        } catch (error: any) {
            this.logger.error(`❌ Error inicializando Firebase: ${error.message}`);
        }
    }

    async sendPush(deviceToken: string, title: string, body: string, id?: number) {

        this.logger.log(`📩 Enviando push a ${deviceToken} con título "${title}" y mensaje "${body}"`);

        try {
            const messaging = getMessaging();

            const message = {
                token: deviceToken,
                notification: { title, body },
                android: { priority: 'high' as const },
                data: id !== undefined ? { id: id.toString() } : undefined,
            };

            const response = await messaging.send(message);
            this.logger.log(`✅ Push enviado: ${response}`);
            return { success: true, messageId: response };
        } catch (error: any) {


            
            this.logger.error(`❌ Error enviando push: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
}