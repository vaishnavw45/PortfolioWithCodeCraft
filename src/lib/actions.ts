'use server';

import type { ContactFormValues } from './types';
import { contactFormSchema } from './types';

export async function submitContactForm(data: ContactFormValues): Promise<{success: boolean, message: string}> {
    const parsedData = contactFormSchema.safeParse(data);

    if (!parsedData.success) {
        return { success: false, message: "Invalid form data." };
    }

    console.log("New contact form submission:", parsedData.data);
    // In a real app, you'd integrate with an email service or save to a database.
    // e.g., await db.collection('contacts').add(parsedData.data);
    
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1000));
    
    return { success: true, message: "Your message has been sent successfully!" };
}
