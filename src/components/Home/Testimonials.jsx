import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Wishing Basaveshwar Engineering College's IEEE Student Branch great success in their AGM on December 24, 2024. May the branch continue to excel in IEEE activities and provide valuable programs for students and faculty.",
      name: 'Dr. T. Srinivas',
      handle: '',
      image:'data:image/jpeg;base64,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'
    },
  ];

  return (
    <section className="bg-black h-fit flex flex-col justify-center items-center text-white py-16 my-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">
          Inspiring Words from <br /> Leaders & Innovators
        </h2>
      </div>
      <div className="max-w-lg mx-auto px-4 grid grid-cols-1 md:grid-cols-1 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#1E1E1E] p-6 rounded-lg flex flex-col justify-between shadow-lg"
          >
            <p className="text-lg italic mb-6">“{testimonial.quote}”</p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10">
                <img src={testimonial.image} alt="" className='w-full rounded-full' />
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.handle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
