import Image from "next/image";

export const Testimonial: React.FC<{
  image: string;
  comment: string;
  happyUser: string;
}> = ({ image, comment, happyUser }) => (
  <div className="testimonial text-xs">
    <div className="testimonial-inner">
      <div className="testimonial-main">
        <div className="testimonial-header">
          <img className="mb-16" src={`/images/${image}`} alt={happyUser} />
        </div>
        <div className="testimonial-body">
          <p className="mb-0">{comment}</p>
        </div>
      </div>
      <div className="testimonial-footer">
        <div className="testimonial-link">
          <a href="#">{happyUser}</a>
        </div>
      </div>
    </div>
  </div>
);
