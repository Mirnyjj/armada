export const Map = () => {
  return (
    <section
      id="map"
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl mb-8 sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        Мы на карте
      </h2>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A6b3e232e3a5e51fd832adf32792dcfe02130d4052818ebb79d298525583fb3af&amp;source=constructor"
        width="100%"
        height="595"
      ></iframe>
    </section>
  );
};
