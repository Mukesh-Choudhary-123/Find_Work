import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import { useUser } from "@clerk/clerk-react";

const Landing = () => {
  const { user } = useUser();

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          {/* <span className="flex items-center gap-2 sm:gap-6">
            at <img src="/logo.png" className="h-12 sm:h-20 lg:h-24" />
          </span> */}
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listing or find the perfect candidate
        </p>
      </section>
      <div className="flex-col sm:flex-row flex gap-6 justify-center items-center">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Job
          </Button>
        </Link>

        {user?.unsafeMetadata?.role === "candidate" && (
          <Link to="/my-jobs">
            <Button variant="secondary" size="xl">
              Applied Job
            </Button>
          </Link>
        )}
        {user?.unsafeMetadata?.role === "recruiter" && (
          <Link to="/my-jobs">
            <Button size="xl" variant="secondary">
              Posted Job
            </Button>
          </Link>
        )}
        {user?.unsafeMetadata?.role === "recruiter" && (
          <Link to="/post-job">
            <Button size="xl" variant="destructive">
              Post a Job
            </Button>
          </Link>
        )}
      </div>

      <Carousel className="w-full py-10" plugins={[Autoplay({ delay: 2000 })]}>
        <CarouselContent className="flex gap-50 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <img src="/banner.jpeg" className="w-full" />

      <section className="md:grid grid-cols-2 md:gird-cols-2  gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="mt-4 md:mt-0">
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default Landing;
