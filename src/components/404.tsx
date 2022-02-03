import UserMessageModal from "./UserMessageModal";

export default function PageNotFound(){
    return (
            <div className="flex w-full h-full justify-center items-center">
                <UserMessageModal message={"Oops, something went wrong!"} container={true}pulse={false}timeout={null}id={"404notFound"}/>
            </div>
    )
}