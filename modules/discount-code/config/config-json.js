module.exports = function configJSON(req) {
    return {
        workflowApiVersion: '1.1',
        metaData: {
            isConfigured: true,
            icon: 'images/icon.svg',
            category: 'customer',
            configurationPath: '/modules/discount-code/index.html'
        },
        type: 'REST',
        lang: {
            'en-US': {
                name: 'Discount Code',
                description: 'Issue a discount code to contact them to entice them to buy something.'
            }
        },
        arguments: {
            execute: {
                inArguments: [
                    {
                        discount: 10,
                        contactKey: '{{Contact.Key}}',
                        emailAddress: '{{Contact.Default.Email}}'
                    }
                ],
                outArguments: [{
                    discountCode: {
                        dataType: 'Text',
                        direction: 'out',
                        access: 'visible'
                    },
                    discount: {
                        dataType: 'Number',
                        direction: 'out',
                        access: 'visible'
                    }
                }],
                url: `https://custom-activity-sophia-sb-245958bcba3c.herokuapp.com/modules/discount-code/execute`
            }
        },
        configurationArguments: {
            publish: {
                url: `https://custom-activity-sophia-sb-245958bcba3c.herokuapp.com/modules/discount-code/publish`
            },
            validate: {
                url: `https://custom-activity-sophia-sb-245958bcba3c.herokuapp.com/modules/discount-code/validate`
            },
            stop: {
                url: `https://custom-activity-sophia-sb-245958bcba3c.herokuapp.com/modules/discount-code/stop`
            }
        },
        userInterfaces: {
            configModal: {
                height: 400,
                width: 500
            }
        }
    };
};
