import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';

const Schedule = () => {
  const events = [
    { date: 'APR 12', title: 'Spring League Kickoff', time: '9:00 AM', location: 'Main Stadium' },
    { date: 'APR 19', title: 'Quarterback Clinic', time: '10:30 AM', location: 'Training Field B' },
    { date: 'MAY 03', title: 'Mid-Season Showcase', time: '1:00 PM', location: 'Main Stadium' },
    { date: 'MAY 24', title: 'Championship Saturday', time: '8:00 AM', location: 'Main Stadium' },
  ];

  return (
    <section id="schedule" className="py-32 px-6 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic text-white mb-6">
            Season <span className="text-blue-600">Schedule</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Mark your calendars for the most exciting season yet. All events are subject to weather conditions.
          </p>
        </div>

        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-600/50 transition-all hover:shadow-2xl hover:shadow-blue-600/5"
            >
              <div className="flex items-center gap-8">
                <div className="text-center min-w-[80px]">
                  <div className="text-blue-500 font-black text-2xl font-display italic">{event.date}</div>
                </div>
                <div className="h-12 w-[1px] bg-zinc-800 hidden md:block" />
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors">{event.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-zinc-500 text-sm">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                  </div>
                </div>
              </div>
              <button className="bg-zinc-800 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">
                Event Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
