"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCrown } from "react-icons/lu";
import Slider from "@/app/components/Slider";
import Table from "@/app/components/Tables";
import SellerComment from "@/app/components/SellerComment";
import Features from "@/app/components/Features";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput,
} from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const { slug } = useParams();
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError(null);

      fetch(`/api/cars?slug=${slug}`)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("Car not found");
            }
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        })
        .then((data) => {
          setCar(data.exactMatches[0] || null);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setCar(null);
          setLoading(false);
        });
    }
  }, [slug]);
  if (!slug) {
    return <div>Sorry! No Car Found</div>;
  }
  if (error) {
    return <div>An Error Occured While Searching</div>;
  }
  if (!car) {
    return <div>No Car Found </div>;
  }
  return (
    <section className="mx-4 my-5 sm:mx-8">
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
            <div>
              <LuCrown fontSize={25} className="text-white" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white">
              Used Vehicle
            </h3>
          </div>
          <div>
            <Slider loadingState={loading} />
          </div>
          <div className="my-5">
            <h3 className="text-2xl font-semibold">
              {loading ? <Skeleton /> : car.model}
            </h3>
            <h4 className="my-2 text-3xl font-semibold text-blue-950 dark:text-red-500">
              {loading ? <Skeleton width={60} /> : `$${car.price}`}
            </h4>
          </div>
          <div className="flex items-center gap-x-3">
            <Button
              color={"white"}
              className="border border-blue-950 text-sm uppercase hover:bg-blue-950 hover:text-white dark:border-red-500 dark:hover:bg-red-500"
              onClick={() => setOpenModal(true)}
            >
              Enquire Now
            </Button>
            <Button
              color={"white"}
              className="bg-blue-950 text-sm uppercase text-white dark:bg-red-500"
              onClick={() => {
                window.location.href = "tel:+1234567890";
              }}
            >
              Call us now
            </Button>
          </div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ModalHeader>Enquire Now</ModalHeader>
            <ModalBody>
              <div>
                <form>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="fname">First Name</Label>
                      <TextInput
                        type="text"
                        id="fname"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="lname">Last Name</Label>
                      <TextInput
                        type="text"
                        id="lname"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="email">Email</Label>
                      <TextInput
                        type="email"
                        id="email"
                        placeholder="Active Email Address"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="phone">Phone</Label>
                      <TextInput
                        type="tel"
                        id="phone"
                        placeholder="+92 333 333333"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea rows={5} placeholder="Comment"></Textarea>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col">
                    <Button
                      color={"dark"}
                      className="w-full text-lg font-semibold uppercase"
                    >
                      Send Enquiry
                    </Button>
                  </div>
                </form>
              </div>
            </ModalBody>
          </Modal>
          <div className="mt-3 border-b-2 border-blue-950 dark:border-gray-700"></div>
          <div>
            <Features loadingState={loading} />
          </div>
        </div>
        <div>
          <Table loadingState={loading} />
          <SellerComment loadingState={loading} />
        </div>
      </div>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.9997072499596!2d73.1154986739374!3d30.663348788985527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b76da7fde6c7%3A0x53937ae1a82170a!2sKhan%20bakers!5e1!3m2!1sen!2s!4v1731403934717!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
