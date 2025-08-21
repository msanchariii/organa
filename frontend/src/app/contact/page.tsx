"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageCircle, Send, Github, ExternalLink, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Contact form schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactForm) => {
        setIsSubmitting(true);
        try {
            // Here you would typically send the data to your backend
            console.log("Contact form data:", data);
            
            toast({
                title: "Message sent successfully!",
                description: "Thank you for reaching out. We'll get back to you soon.",
            });
            reset();
        } catch (error) {
            toast({
                title: "Error sending message",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <MessageCircle className="text-blue-600 mr-3" size={32} />
                        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Have questions, feedback, or want to collaborate? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Send className="mr-2 text-blue-600" size={20} />
                                    Send us a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Full Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                {...register("name")}
                                                placeholder="Enter your full name"
                                                className="mt-1"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                Email Address *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...register("email")}
                                                placeholder="your.email@example.com"
                                                className="mt-1"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                                            Subject *
                                        </Label>
                                        <Input
                                            id="subject"
                                            {...register("subject")}
                                            placeholder="What is this regarding?"
                                            className="mt-1"
                                        />
                                        {errors.subject && (
                                            <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                            Message *
                                        </Label>
                                        <Textarea
                                            id="message"
                                            {...register("message")}
                                            placeholder="Tell us more about your inquiry..."
                                            rows={6}
                                            className="mt-1"
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={isSubmitting} 
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2" size={16} />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Mail className="mr-2 text-blue-600" size={20} />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Mail className="text-gray-400 mt-1" size={16} />
                                    <div>
                                        <p className="font-medium text-gray-900">Email</p>
                                        <p className="text-gray-600">contact@organa.dev</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Phone className="text-gray-400 mt-1" size={16} />
                                    <div>
                                        <p className="font-medium text-gray-900">Response Time</p>
                                        <p className="text-gray-600">24-48 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <MapPin className="text-gray-400 mt-1" size={16} />
                                    <div>
                                        <p className="font-medium text-gray-900">Project Status</p>
                                        <p className="text-gray-600">Open Source & Active</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Project Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="outline" className="w-full justify-start" asChild>
                                    <a 
                                        href="https://github.com/msanchariii/organa" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="mr-2" size={16} />
                                        View on GitHub
                                        <ExternalLink className="ml-auto" size={14} />
                                    </a>
                                </Button>

                                <Button variant="outline" className="w-full justify-start" asChild>
                                    <a 
                                        href="https://github.com/msanchariii/organa/issues" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle className="mr-2" size={16} />
                                        Report Issues
                                        <ExternalLink className="ml-auto" size={14} />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Maintainer */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Project Maintainer</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-blue-600 font-semibold text-lg">SM</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Sanchari Mandal</h3>
                                    <p className="text-sm text-gray-600 mb-3">Lead Developer</p>
                                    <div className="flex justify-center space-x-2">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">Full-Stack</span>
                                        <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">AI/ML</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contribute */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Want to Contribute?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Organa is an open-source project. We welcome contributions from developers, 
                                    healthcare professionals, and anyone passionate about saving lives through technology.
                                </p>
                                <Button variant="default" className="w-full bg-green-600 hover:bg-green-700" asChild>
                                    <a 
                                        href="https://github.com/msanchariii/organa/blob/main/CONTRIBUTING.md" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="mr-2" size={16} />
                                        Contribute Now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
