import { feedback } from "@/constants";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section className="sm:py-16 py-6 w-full">
    <div className="container max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold sm:pb-9 pb-6 text-dimPurple w-full text-center">
        See Why Our Customers Love Us!
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 transition-all gap-6">
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
