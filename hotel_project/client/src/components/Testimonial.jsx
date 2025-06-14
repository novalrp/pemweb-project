import React from 'react';
import Title from './Title';
import { testimonials } from '../assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gradient-to-r from-cyan-100 via-purple-100 to-teal-100 pt-20 pb-30">
      <Title
        title="Apa Kata Tamu Kami"
        subTitle="Cari tahu mengapa para tamu yang bijak selalu memilih HotelQ untuk akomodasi eksklusif dan mewah di berbagai penjuru dunia."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-lg max-w-xs mx-auto"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <StarRating />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">{`"${testimonial.review}"`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
